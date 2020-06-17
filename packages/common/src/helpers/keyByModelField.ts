type ModelWithExcludedKey<T> = {
  [key: string]: Pick<T, Exclude<keyof T, keyof T>>;
};

export const keyByModelField = <T>(
  modelData: T[],
  fieldToKeyBy: keyof T
): ModelWithExcludedKey<T> => {
  const reduceSeed: ModelWithExcludedKey<T> = {};

  return modelData.reduce((keyedModel, currentModelInstance) => {
    const {
      [fieldToKeyBy]: keyField,
      ...currentKeyedModelInstance
    } = currentModelInstance;

    keyedModel[(keyField as unknown) as string] = {
      ...currentKeyedModelInstance,
    };

    return keyedModel;
  }, reduceSeed);
};
