import { Control, FieldPath, FieldValues } from "react-hook-form";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    labelRightElement?: React.ReactNode;
};

const FormInput = <T extends FieldValues>({ 
    control, 
    label, 
    name, 
    disabled, 
    placeholder, 
    type = "text",
    labelRightElement,
    className
}: FormInputProps<T>) => {
    const inputClassName = cn("border-zinc-800 bg-zinc-950 text-white focus-visible:ring-green-500", "selection:bg-green-500 selection:text-black", className);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-2">
                    <div className="flex items-center justify-between">
                        <FormLabel className="text-zinc-400">{label}</FormLabel>
                        {labelRightElement}
                    </div>

                    {/* <FormLabel>{label}</FormLabel> */}
                    <FormControl>
                        <Input
                            className={inputClassName}
                            {...field}
                            placeholder={placeholder}
                            type={type}
                            disabled={disabled}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default FormInput;