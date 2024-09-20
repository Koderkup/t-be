import { FC, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Typo } from '../../../components';
import { HelpMessage } from '../../../shared/types/types.ts';
import { EMAIL_VALIDATION_PATTERN } from '../../../shared/constants';
import useAutosizeTextArea from '../../../hooks/useAutosizeTextArea';

const HelpForm: FC = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<HelpMessage>();

  const text = watch('text') || '';
  const name = watch('name') || '';

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, text);

  return (
    <div className="help-form">
      <Typo className="help-form__title">Write us a message</Typo>
      <form className="help-form__form">
        <div className="help-form__wrapper">
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                isError={!!errors.name || name.length > 20}
                multiline={false}
                errorMessage={
                  errors.name?.message ||
                  (name.length > 20
                    ? 'Name cannot be longer than 20 characters'
                    : '')
                }
                id="name"
                label="Name"
                placeholder="Enter your name"
                onChange={e => {
                  field.onChange(e);
                }}
                value={field.value || ''}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: EMAIL_VALIDATION_PATTERN,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => (
              <TextField
                id="email"
                multiline={false}
                isError={!!errors.email}
                errorMessage={errors.email?.message}
                label="Email"
                placeholder="e.g. lmsyv@mail.com"
                onChange={field.onChange}
                value={field.value || ''}
              />
            )}
          />
          <Controller
            name="text"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 20,
                message: 'The text cannot be shorter than 20',
              },
            }}
            render={({ field }) => (
              <TextField
                id="message"
                multiline
                ref={textAreaRef}
                isError={!!errors.text || text.length > 1000}
                errorMessage={
                  errors.text?.message ||
                  (text.length > 1000
                    ? 'Text cannot be longer than 1000 characters'
                    : '')
                }
                label="Text"
                className="help-form__textarea"
                placeholder="How can we help you?"
                value={field.value || ''}
                onChange={e => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default HelpForm;
