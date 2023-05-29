// jest.config.js
// export default {
//     moduleFileExtensions: ['js', 'ts', 'json', 'tsx'],
//     transform: {
//         '^.+\\.tsx?$': 'ts-jest',
//     },
// }

export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'babel-jest',
    },
    // moduleNameMapper: {
    //     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    //     '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // },
}
