import { createClient } from '@supabase/supabase-js';
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';
import type { Database, Tables, TablesInsert } from './types/database.types';

const supabase = createClient<Database>(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
);

export const getVideoHistories = async (
	videoId: string,
): Promise<Tables<'Video History'>[]> => {
	const { data, error } = await supabase
		.from('Video History')
		.select('*')
		.eq('videoId', videoId);

	if (error) {
		throw error;
	}
	return data || [];
};

export const createVideoHistory = async (
	analyticsData: TablesInsert<'Video History'>,
): Promise<void> => {
	const { error } = await supabase
		.from('Video History')
		.insert(analyticsData);

	if (error) {
		throw error;
	}
};
