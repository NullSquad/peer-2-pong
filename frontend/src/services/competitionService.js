export const joinCompetition = async (username, event_id) => {
	try {
		const response = await fetch(`/api/competition/${event_id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, event_id }),
		});

		if (response.ok) {
			const data = await response.json();
			return { success: true, message: `${data.message || "Joined successfully!"}` };
		} else {
			const errorData = await response.json();
			return { success: false, message: `Error: ${errorData.message || "Failed to join"}` };
		}
	} catch (error) {
		return { success: false, message: `Error: ${error.message}` };
	}
};
