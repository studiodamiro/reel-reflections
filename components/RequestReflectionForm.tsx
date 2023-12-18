'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

export default function RequestReflectionForm() {
  const RequestReflectionValidator = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    name: z.string().min(1, { message: 'Name is required' }),
    movie: z.string().min(1, { message: 'Movie is required' }),
    details: z.string().min(1, { message: 'Details are required' }),
  });

  type TRequestReflectionValidator = z.infer<typeof RequestReflectionValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRequestReflectionValidator>({ resolver: zodResolver(RequestReflectionValidator) });

  const router = useRouter();
  const navToHome = () => router.push('/success');

  const submitHandler: SubmitHandler<TRequestReflectionValidator> = (data) => {
    const { email, name, movie, details } = data;
    console.log(email, name, movie, details);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify({ 'form-name': 'request-reflection', ...data }),
    })
      .then(() => navToHome())
      .catch((error) => console.error(error));
  };

  return (
    <div className='-mx-[2px]'>
      <form
        name='request-reflection'
        method='POST'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
        onSubmit={handleSubmit(submitHandler)}
        className='flex flex-col gap-4'
      >
        <input type='hidden' name='form-name' value='request-reflection' />
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            required
            {...register('email')}
            className={cn({ 'focus-visible:ring-red-500': errors.email })}
            placeholder='you@email.com'
          />
        </div>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            required
            {...register('name')}
            className={cn({ 'focus-visible:ring-red-500': errors.name })}
            placeholder='What should I call you?'
          />
        </div>
        <div>
          <Label htmlFor='movie'>Movie</Label>
          <Input
            required
            {...register('movie')}
            className={cn({ 'focus-visible:ring-red-500': errors.movie })}
            placeholder='What movie do you have in mind?'
          />
        </div>
        <div>
          <Label htmlFor='details'>Movie Details</Label>
          <Textarea
            required
            {...register('details')}
            className={cn({ 'focus-visible:ring-red-500': errors.details })}
            placeholder='Help me find it. What year was it released? Whose movie is it? Any links?'
          />
        </div>
        <button
          type='submit'
          className={cn(
            'relative mx-[2px] px-4 py-3 flex-none rounded-lg tracking-widest text-sm font-bold uppercase shadow-md items-center justify-center',
            'bg-slate-900/70 dark:bg-white/70 dark:text-slate-900 text-white opacity-80 hover:opacity-100',
            'transition-all duration-300 ease-out'
          )}
        >
          Request Reflection
        </button>
      </form>
    </div>
  );
}
