export type SignInForm = {
  email: string
  password: string
  rememberMe: boolean
}

export type SignInFormError = {
  email?: string[]
  password?: string[]
}

export type SignUpForm = {
  email: string
  password: string
  confirmPassword: string
}

export type SignUpFormError = {
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
}
