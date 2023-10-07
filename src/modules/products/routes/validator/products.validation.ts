import {celebrate, Joi, Segments} from 'celebrate'

export const createProductMiddleware = celebrate({
    [Segments.BODY]: {
        name: Joi.string().required().label('nome do produto'),
        brand_id: Joi.string().uuid().required().label("id do produto"),
        specification_id: Joi.string().label("id da especificação")
    }
});


export const updateProductMiddleware = celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
        name: Joi.string().label('nome do produto'),
        brand_id: Joi.string().uuid().label("id do produto"),
        specification_id: Joi.string().label("id da especificação")
    }
});

export const indexProductMiddleware = celebrate({
    [Segments.QUERY]: {
        page: Joi.number().default(1),
        limit: Joi.number().default(50),

    }
});

export const showProductMiddleware = celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
});

export const deleteProductMiddleware = celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
});