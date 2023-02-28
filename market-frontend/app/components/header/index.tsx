import { useTheme } from "~/context/theme";
import { Box, Container } from "../utilities";
import { Account } from "./account";
// import { Bag } from "./bag";
import { DisplayNav } from "./display-nav";
import { Logo } from "./logo";
import { containerClasses, leftBoxClasses, rightBoxClasses } from "./styled";
import { useBroadcastChannel } from "~/hooks/useBroadcastChannel";
import { useThemeBroadcastChannel } from "~/hooks/useThemeBroadcastChannel";

export const Header = () => {
  const [, handleThemeChange] = useTheme();

  const { postMessage, subscribeMessage } = useBroadcastChannel("theme");

  useThemeBroadcastChannel({ subscribeMessage, handleThemeChange });

  return (
      <Container classes={containerClasses}>
        <Box classes={leftBoxClasses}>
          <DisplayNav />
          <Logo />
        </Box>
        <Box classes={rightBoxClasses}>
          <Account postMessage={postMessage} />
          {/* <Bag /> */}
        </Box>
      </Container>
  );
};
