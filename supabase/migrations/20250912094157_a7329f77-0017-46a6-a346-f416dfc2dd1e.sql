-- Add missing columns and fix invoices table structure
ALTER TABLE public.invoices 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS invoice_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Enable RLS on invoices table
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for invoices
CREATE POLICY "Users can view their own invoices" 
ON public.invoices 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own invoices" 
ON public.invoices 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices" 
ON public.invoices 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices" 
ON public.invoices 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();