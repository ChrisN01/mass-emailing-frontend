interface TextareaProps
{
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}


const Textarea: React.FC<TextareaProps> = ({ 
    
    value,
    onChange,
    placeholder="Type your message here...",
    
    }) =>
    {
        return (
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Your message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={value}
                    onChange={onChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                    required
                    />
            </div>
            
        );
    };

export default Textarea;