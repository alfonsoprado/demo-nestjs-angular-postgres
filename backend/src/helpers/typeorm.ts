import { HttpException, HttpStatus } from '@nestjs/common';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { isEqual, pick } from 'lodash';

export async function assertColumnNotUsed<Entity>({
  repository,
  uniqueKeys, 
  primaryKeys, // update case
  message = "It already exists."
}: {
  repository: Repository<Entity>, 
  uniqueKeys: FindOptionsWhere<Entity>, 
  primaryKeys?: FindOptionsWhere<Entity>, // update case
  message?: string
}): Promise<void> {
  let isUnique = true;
  if(primaryKeys) { // update case
    if(Object.values(uniqueKeys).some(value => !value)) { // if there is any property in uniqueKeys without a value, add it
      const entityDb = await repository.findOne({ where: primaryKeys });
      for (const key in uniqueKeys) {
        if(!uniqueKeys[key]) uniqueKeys[key] = entityDb[key] as any;
      }
    }
    // if there is a record with a different id, then the column is used
    // if it doesn't find anything, it means there is no record and the column is not used
    // if it is the same record with the same id, there is no problem; the column can be modified with the same value
    // obs: consider the case where the record is modified with its own previous values (it should be allowed).
    const entityDb = await repository.findOne({ where: uniqueKeys });
    isUnique = entityDb === null || isEqual(primaryKeys, pick(entityDb, Object.keys(primaryKeys)));
  } else { // create case
    // if it doesn't find anything, it means there is no record, and the unique values are available to create a new record.
    const entityDb = await (repository as Repository<Entity>).findOne({ where: uniqueKeys });
    isUnique = !entityDb;
  }

  if(!isUnique) {
    throw new HttpException(
      message,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function assertRecordExists<Entity>(
  repository: Repository<Entity>, 
  uniqueKeys: FindOptionsWhere<Entity>, 
  message: string = "Not found."
): Promise<Entity> {
  const entity = await repository.findOne({
    where: uniqueKeys
  });
  if (!entity) {
    throw new HttpException(
      message,
      HttpStatus.NOT_FOUND,
    );
  }
  return entity;
}

export function pagination<T>(
	qb: SelectQueryBuilder<T>,
	{
		page = 0,
		pageSize = 10,
	}: {
		page?: number;
		pageSize?: number;
	},
): SelectQueryBuilder<T> {
	const skip = page * pageSize;
	const take = pageSize;

	return qb.skip(skip).take(take);
}

