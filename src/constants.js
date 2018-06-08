import * as shortid from 'shortid';

export const id = {
    type: String,
    default: shortid.generate,
    index: true
};

export const defaultSchemaOptions = {
    autoIndex: false,
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toObject: {
        virtuals: true,
        getters: true
    },
    toJSON: {
        virtuals: true,
        getters: true
    }
};