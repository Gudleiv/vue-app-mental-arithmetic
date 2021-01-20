export function validateState ($v) {
    return function (name) {
      // TODO: обработка ошибок
      const { $dirty, $error } = $v[name]
      return $dirty ? !$error : null
    }
  }
