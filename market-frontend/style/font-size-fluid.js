const sizes = [{
    name: "xs",
    dims: {
      fs: {
        min: 0.625,
        max: 0.75
      },
      lh: {
        min: 0.75,
        max: 1
      },
    }
  },
  {
    name: "sm",
    dims: {
      fs: {
        min: 0.75,
        max: 0.875
      },
      lh: {
        min: 1,
        max: 1.25
      },
    }
  },
  {
    name: "base",
    dims: {
      fs: {
        min: 0.875,
        max: 1
      },
      lh: {
        min: 1.25,
        max: 1.5
      },
    }
  },
  {
    name: "lg",
    dims: {
      fs: {
        min: 1,
        max: 1.125
      },
      lh: {
        min: 1.5,
        max: 1.75
      },
    }
  },
  {
    name: "xl",
    dims: {
      fs: {
        min: 1.125,
        max: 1.25
      },
      lh: {
        min: 1.75,
        max: 1.75
      },
    }
  },
  {
    name: "2xl",
    dims: {
      fs: {
        min: 1.25,
        max: 1.5
      },
      lh: {
        min: 1.75,
        max: 2
      },
    }
  },
  {
    name: "3xl",
    dims: {
      fs: {
        min: 1.5,
        max: 1.875
      },
      lh: {
        min: 2,
        max: 2.25
      },
    }
  },
  {
    name: "4xl",
    dims: {
      fs: {
        min: 1.875,
        max: 2.25
      },
      lh: {
        min: 2.25,
        max: 2.5
      },
    }
  },
  {
    name: "5xl",
    dims: {
      fs: {
        min: 2.25,
        max: 3
      },
      lh: {
        min: 2.5,
        max: -1
      },
    }
  },
  {
    name: "6xl",
    dims: {
      fs: {
        min: 3,
        max: 3.75
      },
      lh: {
        min: -1,
        max: -1
      },
    }
  },
  {
    name: "7xl",
    dims: {
      fs: {
        min: 3.75,
        max: 4.75
      },
      lh: {
        min: -1,
        max: -1
      },
    }
  },
  {
    name: "8xl",
    dims: {
      fs: {
        min: 4.75,
        max: 6
      },
      lh: {
        min: -1,
        max: -1
      },
    }
  },
  {
    name: "9xl",
    dims: {
      fs: {
        min: 6,
        max: 8
      },
      lh: {
        min: -1,
        max: -1
      },
    }
  },
]

const calcR = (x1, x2) => (y1, y2) => Math.round(((x1 * y2 * 14 - x2 * y1 * 14) / (x1 - x2)) / 14 * 1000) / 1000

const calcV = (x1, x2) => (y1, y2) => Math.round(100 * (y2 * 14 - y1 * 14) / (x2 - x1) * 1000) / 1000

const calcRWith = calcR(480, 1280)

const calcVWith = calcV(480, 1280)

let fontSize = Object.create(null)

sizes.forEach(size => {
  const fs = size.dims.fs
  const lh = size.dims.lh
  const fsR = calcRWith(fs.min, fs.max)
  const lhR = calcRWith(lh.min, lh.max)
  const fsV = calcVWith(fs.min, fs.max)
  const lhV = calcVWith(fs.min, fs.max)
  fontSize = {
    ...fontSize,
    [size.name]: [`clamp(${fs.min}rem, ${fsV}vw + ${fsR}rem, ${fs.max}rem)`, {
      lineHeight: lh.max === lh.min ? `${lh.min === -1 ? '1' :  `${lh.min}rem`}` : `clamp(${lh.min}rem, ${lhV}vw + .${lhR}rem, ${lh.max === -1  ? '1' :  `${lh.max}rem`})`
    }]
  }
})

