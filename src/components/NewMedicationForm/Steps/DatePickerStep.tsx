import { Calendar } from 'lucide-react';
import { StepProps } from '../types';
import { format } from 'date-fns';
import { DatePicker } from "@/components/DatePicker.tsx";

export function DatePickerStep({formData, setFormData}: StepProps) {
    const handleDateChange = (date: Date) => {
        setFormData({
            ...formData,
            startDate: format(date, 'yyyy-MM-dd')
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
                    <Calendar className="w-6 h-6 text-cyan-500"/>
                </div>
                <h3 className="text-lg font-semibold">Quand devez-vous prendre la prochaine dose ?</h3>
            </div>

            <DatePicker onDateChange={handleDateChange}/>
        </div>
    );
}