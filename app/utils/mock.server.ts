type getMockDataOptions<T> = {
    data: T,
    delay: number,
    error?: string
}

export const getMockData = async <T>({ data, error, delay }: getMockDataOptions<T>): Promise<{ type: string, data: T }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve({
                    type: 'Success ✅',
                    data,
                });
            } else {
                reject({
                    type: 'Error ❌',
                    message: error,
                });
            }
        }, delay || 1000);
    });
}