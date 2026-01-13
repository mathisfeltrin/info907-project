import styled from "styled-components";

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
}) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      $size={size}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: ${(props) =>
    props.$size === "small" ? "0.5rem 1rem" : "0.75rem 1.5rem"};
  font-size: ${(props) => (props.$size === "small" ? "0.875rem" : "1rem")};
  font-weight: 600;
  color: white;
  background: ${(props) => {
    if (props.$variant === "secondary") return "#6b7280";
    if (props.$variant === "danger") return "#ef4444";
    return "#3b82f6";
  }};
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${(props) => {
      if (props.$variant === "secondary") return "#4b5563";
      if (props.$variant === "danger") return "#dc2626";
      return "#2563eb";
    }};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
