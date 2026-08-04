import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';

export async function uploadBlogCover(
  base64: string,
  userId: string,
  mime: string = 'image/jpeg',
) {
  const ext = mime.split('/')[1] || 'jpeg';
  const path = `${userId}/${Date.now()}.${ext === 'jpeg' ? 'jpg' : ext}`;

  const { error } = await supabase.storage
    .from('blog-covers')
    .upload(path, decode(base64), {
      contentType: mime,
      upsert: false,
    });
  if (error) throw error;
  const { data } = supabase.storage.from('blog-covers').getPublicUrl(path);
  return data.publicUrl;
}
