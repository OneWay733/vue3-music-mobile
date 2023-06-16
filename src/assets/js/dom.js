export function addClass(target, className) {
  if (!target.classList.contains(className)) {
    target.classList.add(className)
  }
}

export function removeClass(target, className) {
  target.classList.remove(className)
}
