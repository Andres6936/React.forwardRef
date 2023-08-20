export function useString() {
    const capitalizeFirstLetter = (value: string): string => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    const getLabelUsing = (value: string) => {
        return 'Label-' + value.replace(' ', '')
    }

    return {
        capitalizeFirstLetter,
        getLabelUsing,
    }
}