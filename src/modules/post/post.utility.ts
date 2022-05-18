

export function getCategoriesData(ids: string[] | number[]): any[] {
    const categories = ids.map(a => {
        return {
            assignedAt: new Date(),
            category: {
                connect: {
                    id: Number(a),
                },
            },
        }
    })
    return categories;
}