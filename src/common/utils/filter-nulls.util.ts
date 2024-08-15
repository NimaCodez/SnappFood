type DTO = Record<string, any>;

export function FilterData<DTO>(dto: DTO): Partial<DTO> {
    return Object.fromEntries(
        Object.entries(dto).filter(
            ([_, value]) => value !== null && value !== undefined && value !== '',
        ),
    ) as Partial<DTO>;
}