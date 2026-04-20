import { reactive } from 'vue'
import type { SignUpForm, SignUpFormError } from '../types'

export function useSignUp() {
  const form = reactive<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const error = reactive<SignUpFormError>({})

  return { form, error }
}
