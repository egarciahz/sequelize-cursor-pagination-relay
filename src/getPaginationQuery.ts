import { Op } from 'sequelize';

export default function getPaginationQuery(
    cursor,
    cursorOrderOperator,
    paginationField,
    primaryKeyField
) {
    if (paginationField !== primaryKeyField) {
        return {
            [Op.or]: [
                {
                    [paginationField]: {
                        [cursorOrderOperator]: cursor[0],
                    },
                },
                {
                    [paginationField]: cursor[0],
                    [primaryKeyField]: {
                        [cursorOrderOperator]: cursor[1],
                    },
                },
            ],
        };
    } else {
        return {
            [paginationField]: {
                [cursorOrderOperator]: cursor[0],
            },
        };
    }
}
