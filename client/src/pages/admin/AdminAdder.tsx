// template for future CMS pages:
// -> read with a query, prefill the form using react-hook-form, write with mutation

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface EmailFormData {
  to: string;
  subject: string;
  message: string;
}

const createEmail = async (formData: EmailFormData) => {
  const info = await fetch('/api/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!info.ok) throw new Error('Failed to send email');
  return info.json();
};

// can copy format for events / gallery / team editors
export default function AdminAdder() {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState<EmailFormData>({
    to: '',
    subject: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: createEmail,
    onSuccess: () => {
      // lowkey just for the future when we have admin list
      queryClient.invalidateQueries({ queryKey: ['AdminList'] });
      alert('Terrence is the GOAT');
    },
    onError: () => {
      alert('Terrence sucks at coding (but hes goated at TFT)');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formValues);
  };

  return (
    <div className="max-w-2xl flex flex-col">
      <h1 className="text-2xl font-bold mb-5">Add a New Admin</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={formValues.to}
            placeholder="Email:"
            onChange={handleChange}
            name="to"
            className="bg-gray-500 pl-5 pr-15 py-2 rounded-xl"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={formValues.subject}
            placeholder="Subject:"
            onChange={handleChange}
            name="subject"
            className="bg-gray-500 pl-5 pr-15 py-2 rounded-xl"
          />
        </div>

        <div>
          <textarea
            value={formValues.message}
            placeholder="Message:"
            onChange={handleChange}
            name="message"
            className="bg-gray-500 pl-5 pr-15 py-2 rounded-xl"
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-accent1-primary p-3 px-10 rounded-2xl"
        >
          {mutation.isPending ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
