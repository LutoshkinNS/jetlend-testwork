import { Button } from "@/common/ui/button";

interface FetchButtonProps {
  onClick: () => void;
}

export function FetchButton({ onClick }: FetchButtonProps) {
  return <Button onClick={onClick}>Загрузить данные</Button>;
}
