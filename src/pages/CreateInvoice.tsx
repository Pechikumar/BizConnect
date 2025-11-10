import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useInvoices } from '@/hooks/useInvoices';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user.id);
  const { createInvoice, isCreating } = useInvoices();
  
  const [formData, setFormData] = useState({
    month: '',
    sales_amount: '',
    invoice_date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      return;
    }

    createInvoice({
      month: parseInt(formData.month),
      sales_amount: parseInt(formData.sales_amount),
      invoice_date: formData.invoice_date,
      description: formData.description || undefined,
    });

    // Reset form after successful submission
    setFormData({
      month: '',
      sales_amount: '',
      invoice_date: new Date().toISOString().split('T')[0],
      description: '',
    });
    
    navigate('/invoices');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Please log in to create invoices.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create New Invoice</CardTitle>
              <CardDescription>
                Add a new invoice to track your business transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                    <Input
                      id="month"
                      type="number"
                      placeholder="e.g., 1 for January, 12 for December"
                      min="1"
                      max="12"
                      value={formData.month}
                      onChange={(e) => handleInputChange('month', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invoice_date">Invoice Date</Label>
                    <Input
                      id="invoice_date"
                      type="date"
                      value={formData.invoice_date}
                      onChange={(e) => handleInputChange('invoice_date', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales_amount">Sales Amount</Label>
                  <Input
                    id="sales_amount"
                    type="number"
                    placeholder="Enter amount in cents (e.g., 10000 for $100.00)"
                    min="0"
                    value={formData.sales_amount}
                    onChange={(e) => handleInputChange('sales_amount', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional details about this invoice..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1"
                  >
                    {isCreating ? 'Creating...' : 'Create Invoice'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/invoices')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateInvoice;
