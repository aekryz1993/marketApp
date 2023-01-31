import bcrypt from "bcryptjs";
const geodb = require("geodb-cities");

const locations = [
  { name: "oran", countryCode: "DZ", regionCode: "31" },
  { name: "algiers", countryCode: "DZ", regionCode: "16" },
  { name: "tlemcen", countryCode: "DZ", regionCode: "13" },
  { name: "aïn témouchent", countryCode: "DZ", regionCode: "46" },
];

const getCityInfo = async (city) => {
  try {
    const { data } = await geodb.findCountryRegionCities({
      limit: 10,
      countryCode: city.countryCode,
      regionCode: city.regionCode,
    });

    const { name, latitude, longitude } = data.find((_cityInfo) =>
      _cityInfo.name.toLowerCase().startsWith(city.name)
    );

    return { name, latitude, longitude, countryCode: city.countryCode };
  } catch (error) {
    console.error(error);
  }
};

async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}

async function createUsers(prisma) {
  const users = [];
  for (let index in [...Array(4)]) {
    const userBody = {
      username: `user_${parseInt(index)}`,
      hashedPassword: await encryptPassword(`user_${parseInt(index)}`),
    };

    const existUser = await prisma.user.findUnique({
      where: {
        username: userBody.username,
      },
      include: {
        location: true,
      },
    });

    if (!existUser) {
      const cityBody = await getCityInfo(locations[index]);

      const location = await prisma.location.create({ data: cityBody });
      const newUser = await prisma.user.create({
        data: { ...userBody, location: { connect: { id: location.id } } },
        include: {
          location: true,
        },
      });

      users.push(newUser);
    } else {
      users.push(existUser);
    }
  }

  return users;
}

export { createUsers };
