import { Field, ObjectType, Directive, ID } from 'type-graphql';
import { recipes } from '../data'

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Recipe{
    @Field(() => ID)
    id: string;

    @Field()
    name: string;
    
    @Field()
    createdAt: string;
    
    @Field()
    createdBy: string;
} 

export async function resolveRecipeReference(
    reference: Pick<Recipe, 'id'>
): Promise<Recipe> {
    return recipes.find(u => u.id === reference.id)!;
}