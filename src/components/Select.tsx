import {
  Select as SelectRoot,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import { ChevronDownIcon } from "native-base";

export interface IOptionSelect {
  label: string;
  value: string;
}

type Props = {
  options: IOptionSelect[];
  selectedValue?: string | null;
  defaultValue?: string;

  onValueChange: (arg: string) => void;
};

export function Select({
  options,
  selectedValue,
  defaultValue,
  onValueChange,
}: Props) {
  return (
    <SelectRoot
      flex={1}
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      defaultValue={defaultValue}
    >
      <SelectTrigger variant="outline" flex={1}>
        <SelectInput color="$gray100" placeholder="Selecione uma opção" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  );
}
