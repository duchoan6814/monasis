import { Info } from "@tamagui/lucide-icons-2";
import { Card, SizableText, XStack } from "tamagui";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <Card borderWidth={1} borderColor="$red11" bg="$red3" w="100%">
      <Card.Header>
        <XStack ai="center" gap="$2">
          <Info col="$red11" size={18} />
          <SizableText size={"$4"} col="$red11">
            {message}
          </SizableText>
        </XStack>
      </Card.Header>
    </Card>
  );
};

export default Alert;
