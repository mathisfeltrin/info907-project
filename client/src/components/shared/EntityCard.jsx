import styled from "styled-components";
import { useState } from "react";

const getIcon = (type) => {
  switch (type) {
    case "driver":
      return "👤";
    case "car":
      return "🏎️";
    case "circuit":
      return "🏁";
    default:
      return "❓";
  }
};

const getImagePath = (type, name) => {
  // Enlever les espaces du nom pour le nom de fichier
  const fileName = name.replace(/\s+/g, "");
  return `/images/${type}s/${fileName}.jpg`;
};

export function EntityCard({
  name,
  type,
  isSelected = false,
  isAvailable = true,
  onClick,
  disabled = false,
  showDetails = false,
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      $isSelected={isSelected}
      $isAvailable={isAvailable}
      $disabled={disabled}
      onClick={disabled ? null : onClick}
    >
      {!imageError ? (
        <>
          <EntityImage
            src={getImagePath(type, name)}
            alt={name}
            onError={() => setImageError(true)}
          />
          <Overlay>
            <Name $showDetails={showDetails}>{name}</Name>
            {showDetails && <Type>{type}</Type>}
          </Overlay>
        </>
      ) : (
        <>
          <IconContainer>
            <Icon>{getIcon(type)}</Icon>
          </IconContainer>
          <Overlay>
            <Name $showDetails={showDetails}>{name}</Name>
            {showDetails && <Type>{type}</Type>}
          </Overlay>
        </>
      )}
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  border: 2px solid
    ${(props) => {
      if (props.$isSelected) return "#3b82f6";
      if (!props.$isAvailable) return "#9ca3af";
      return "#e5e7eb";
    }};
  border-radius: 8px;
  background: ${(props) => (props.$isAvailable ? "#ffffff" : "#f3f4f6")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  overflow: hidden;
  opacity: ${(props) => (props.$isAvailable ? 1 : 0.6)};
  box-shadow: ${(props) =>
    props.$isSelected
      ? "0 4px 12px rgba(59, 130, 246, 0.3)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)"};

  &:hover {
    ${(props) =>
      !props.$disabled &&
      props.$isAvailable &&
      `
      transform: translateY(-2px);
      border-color: #3b82f6;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `}
  }
`;

const EntityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
`;

const Icon = styled.div`
  font-size: 4rem;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    transparent 100%
  );
  text-align: center;
`;

const Name = styled.div`
  font-weight: 600;
  color: #ffffff;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: ${(props) => (props.$showDetails ? "0.25rem" : 0)};
`;

const Type = styled.div`
  font-size: 0.7rem;
  color: #e5e7eb;
  text-transform: capitalize;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;
