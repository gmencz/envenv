import { Field, ObjectType, Directive, ID } from 'type-graphql';
import { logs } from '../data'

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Log{
    @Field(() => ID)
    id: string;
    
    @Field()
    createdAt: string;
    
    @Field()
    message: string;
} 

export async function resolveLogReference(
    reference: Pick<Log, 'id'>
): Promise<Log> {
    return logs.find(l => l.id === reference.id)!;
}