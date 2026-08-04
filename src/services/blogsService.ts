import { supabase } from '@/lib/supabase';

export interface Blogs {
  id: string;
  title: string;
  body: string;
  coverUrl?: string;
  createdAt: Date;
  updateAt: Date;
}

export interface newBlog {
  title: string;
  body: string;
  coverUrl?: string;
}

export interface updateBlog {
  id: string;
  title: string;
  body: string;
  coverUrl?: string;
}

const mapRow = (row: any) => ({
  id: row.id,
  title: row.title,
  body: row.body,
  coverUrl: row.cover_url ?? undefined,
  createdAt: new Date(row.created_at),
  updateAt: new Date(row.update_at),
});

const BLOGS_PAGE_SIZE = 10;

export const fetchBlogs = async (): Promise<Blogs[]> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
};

export const insertBlogs = async (payload: newBlog): Promise<Blogs> => {
  const { data, error } = await supabase
    .from('blogs')
    .insert({
      title: payload.title,
      body: payload.body,
      cover_url: payload.coverUrl ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
};

export const updateBlogs = async (payload: updateBlog): Promise<Blogs> => {
  const { id, title, body, coverUrl } = payload;
  const { data, error } = await supabase
    .from('blogs')
    .update({
      title,
      body,
      cover_url: coverUrl ?? null,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
};

export const deleteBlogsById = async (id: string): Promise<void> => {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw error;
};
