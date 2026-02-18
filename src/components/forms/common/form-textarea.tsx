import { 
    Control, 
    FieldPath, 
    FieldValues 
} from "react-hook-form";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    rows?: number;
};

const FormTextarea = <T extends FieldValues>({ 
    control, 
    label, 
    name, 
    disabled, 
    placeholder, 
    className,
    rows = 4
}: FormTextareaProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("space-y-2", className)}>
                    <FormLabel className="text-zinc-400">{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            disabled={disabled}
                            rows={rows}
                            className={cn("border-zinc-800 bg-zinc-950 text-white focus-visible:ring-green-500 w-full resize-none",
                                          "selection:bg-green-500 selection:text-black"
                            )}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default FormTextarea;
