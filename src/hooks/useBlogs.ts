import {
  fetchBlogs,
  insertBlogs,
  updateBlogs,
  deleteBlogsById,
  Blogs,
} from '@/services/blogsService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const blogsKey = {
  all: ['blogs'] as const,
};

export const useGetBlogs = () => {
  return useQuery({ queryKey: blogsKey.all, queryFn: fetchBlogs });
};

export const useAddBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertBlogs,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: blogsKey.all }),
  });
};

export const useUpdateBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlogs,
    onMutate: async payload => {
      await queryClient.cancelQueries({ queryKey: blogsKey.all });

      const previous = queryClient.getQueriesData<Blogs[]>({
        queryKey: blogsKey.all,
      });

      queryClient.setQueriesData<Blogs[]>({ queryKey: blogsKey.all }, old =>
        old
          ? old.map(t =>
              t.id === payload.id
                ? {
                    ...t,
                    title: payload.title,
                    body: payload.body,
                    coverUrl: payload.coverUrl ?? t.coverUrl,
                    updateAt: new Date(),
                  }
                : t,
            )
          : old,
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: blogsKey.all });
    },
  });
};

export const useDeleteBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogsById,
    onMutate: async deleteId => {
      await queryClient.cancelQueries({ queryKey: blogsKey.all });

      const previous = queryClient.getQueriesData<Blogs[]>({
        queryKey: blogsKey.all,
      });

      queryClient.setQueriesData<Blogs[]>({ queryKey: blogsKey.all }, old =>
        old ? old.filter(t => t.id != deleteId) : old,
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      context?.previous.forEach(([queryKey, data]) =>
        queryClient.setQueryData(queryKey, data),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: blogsKey.all });
    },
  });
};
