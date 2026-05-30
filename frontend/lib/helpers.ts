export const getNameInitials = (name: string): string => {
	const trimmedName = name.trim();
	if (!trimmedName) {
		return '';
	}

	const allNames = trimmedName.split(/\s+/);
	if (allNames.length === 1) {
		return allNames[0].charAt(0).toUpperCase();
	}

	return `${allNames[0].charAt(0).toUpperCase()}${allNames[
		allNames.length - 1
	]
		.charAt(0)
		.toUpperCase()}`;
};
