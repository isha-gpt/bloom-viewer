// Utility functions for score-related operations

export function getScoreColor(score: number): string {
	// Use the same color scheme as metajudge badges
	// 1-2.5: white, 2.6-5: yellow, 5.1-7.5: orange, 7.6-10: red
	if (score <= 2.5) {
		return 'bg-white text-black border border-gray-300';
	} else if (score <= 5) {
		return 'bg-yellow-200/60 text-yellow-900 border border-yellow-300';
	} else if (score <= 7.5) {
		return 'bg-orange-400/60 text-orange-900 border border-orange-500';
	} else {
		return 'bg-red-500/60 text-red-900 border border-red-600';
	}
} 