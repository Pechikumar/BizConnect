import { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export interface Invoice extends Tables<'invoices'> {}

export interface CreateInvoiceData {
  month: number;
  sales_amount: number;
  invoice_date: string;
  description?: string;
}

export const useInvoices = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Invoice[];
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (invoiceData: CreateInvoiceData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('invoices')
        .insert({
          ...invoiceData,
          user_id: user.id,
        } as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create invoice: " + error.message,
        variant: "destructive",
      });
    },
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: async (invoiceId: string) => {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete invoice: " + error.message,
        variant: "destructive",
      });
    },
  });

  return {
    invoices,
    isLoading,
    error,
    createInvoice: createInvoiceMutation.mutate,
    deleteInvoice: deleteInvoiceMutation.mutate,
    isCreating: createInvoiceMutation.isPending,
    isDeleting: deleteInvoiceMutation.isPending,
  };
};