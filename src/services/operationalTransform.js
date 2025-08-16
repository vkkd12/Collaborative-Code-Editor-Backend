// Minimal Operational Transform placeholder
export function applyOperation(content, op) {
  if (op.type === 'insert') {
    return content.slice(0, op.index) + (op.text || '') + content.slice(op.index);
  }
  if (op.type === 'delete') {
    return content.slice(0, op.index) + content.slice(op.index + (op.length || 0));
  }
  return content;
}

export function composeOps(a, b) {
  // naive; extend to handle index shifts
  return [a, b];
}