'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(handleContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Message Sent!',
        description: state.message,
      });
    } else if (state.message && Object.keys(state.errors).length > 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
          <CardDescription>
            Have a question? Fill out the form below and we'll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.success ? (
             <div className="text-center p-8 bg-green-50 rounded-lg">
                <h3 className="text-xl font-bold text-green-800">Thank you!</h3>
                <p className="text-green-700">{state.message}</p>
             </div>
          ) : (
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
                {state.errors?.name && (
                  <p className="text-sm text-destructive">{state.errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                {state.errors?.email && (
                  <p className="text-sm text-destructive">{state.errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message..." required />
                {state.errors?.message && (
                  <p className="text-sm text-destructive">{state.errors.message}</p>
                )}
              </div>
              <SubmitButton />
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
