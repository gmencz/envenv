export default function getASTType(
  parsedAST: string,
  typeName: string,
  typeAfterDesiredTypeName?: string,
  typeBeforeDesiredTypename?: string
): string {
  const ASTLines = parsedAST.split('\n').map(line => line.trim());

  const indexOfTypeStartingPoint = ASTLines.findIndex(line => {
    if (line.includes('{')) {
      const isWantedType = line.split('{')[0].trim() === typeName.toLowerCase();

      return isWantedType;
    }

    return false;
  });

  if (indexOfTypeStartingPoint === -1) {
    throw new Error(
      `The provided type (${typeName}) is not part of the AST Node you provided`
    );
  }

  // Remove the operation name, variables and extra brackets of the parsed AST node.
  const validASTLines = ASTLines.filter((_, index, ref) => {
    if (index <= indexOfTypeStartingPoint || index >= ref.length - 2) {
      return false;
    }

    return true;
  });

  if (typeAfterDesiredTypeName) {
    const typeToExcludeIndex = validASTLines.findIndex(line => {
      const typeName = line.split('{')[0].trim();

      if (typeName.toLowerCase() === typeAfterDesiredTypeName.toLowerCase()) {
        return true;
      }

      return false;
    });

    if (typeToExcludeIndex === -1) {
      throw new Error(
        `The provided typeAfterDesiredTypeName (${typeAfterDesiredTypeName}) is not part of the AST Node you provided`
      );
    }

    const graphqlString = validASTLines
      .filter((_, index) => index < typeToExcludeIndex - 1)
      .join(' ');

    return graphqlString;
  }

  if (typeBeforeDesiredTypename) {
    const typeToExcludeIndex = validASTLines.findIndex(line => {
      const typeName = line.split('{')[0].trim();

      if (typeName.toLowerCase() === typeBeforeDesiredTypename.toLowerCase()) {
        return true;
      }

      return false;
    });

    if (typeToExcludeIndex === -1) {
      throw new Error(
        `The provided typeBeforeDesiredTypename (${typeBeforeDesiredTypename}) is not part of the AST Node you provided`
      );
    }

    const graphqlString = validASTLines
      .filter((_, index) => index > typeToExcludeIndex)
      .join(' ');

    return graphqlString;
  }

  return validASTLines
    .filter((_, index, ref) => index < ref.length - 1)
    .join(' ');
}
