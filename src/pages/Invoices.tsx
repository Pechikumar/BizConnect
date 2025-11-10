import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Calendar, DollarSign, FileText, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useInvoices } from '@/hooks/useInvoices';

const Invoices = () => {
  const { user } = useAuth();
  const { invoices, isLoading, deleteInvoice, isDeleting } = useInvoices();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100); // Convert from cents to dollars
  };

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'Invalid Month';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Please log in to view your invoices.
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Invoices</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your business invoices
            </p>
          </div>
          <Button asChild>
            <Link to="/create-invoice" className="flex items-center gap-2">
              <Plus size={16} />
              Create Invoice
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : invoices && invoices.length > 0 ? (
          <div className="grid gap-6">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-card transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText size={20} />
                        Invoice for {getMonthName(invoice.month)}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Created {formatDate(invoice.created_at)}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteInvoice(invoice.id)}
                      disabled={isDeleting}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent rounded-lg">
                        <DollarSign size={16} className="text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-semibold text-foreground">
                          {formatCurrency(invoice.sales_amount)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent rounded-lg">
                        <Calendar size={16} className="text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold text-foreground">
                          {formatDate(invoice.invoice_date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="px-3 py-1">
                        Month {invoice.month}
                      </Badge>
                    </div>
                  </div>
                  
                  {invoice.description && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="text-foreground mt-1">{invoice.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No invoices yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get started by creating your first invoice.
                </p>
                <Button asChild>
                  <Link to="/create-invoice" className="flex items-center gap-2">
                    <Plus size={16} />
                    Create Your First Invoice
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Invoices;