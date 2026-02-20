export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePassword = (password) => {
  return /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password)
}