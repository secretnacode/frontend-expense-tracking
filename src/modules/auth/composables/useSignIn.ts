import { reactive } from 'vue'
import type { SignInForm, SignInFormError, SignUpForm, SignUpFormError } from '../types'

export function useSignIn() {
  const form = reactive<SignInForm>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const error = reactive<SignInFormError>({})

  return { form, error }
}
