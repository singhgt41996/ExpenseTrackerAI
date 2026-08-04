import { InputComponent } from '@/components/atoms/input';
import { TextArea } from '@/components/molecules/textarea';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { borderRadius, colors, spacing } from '@/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import z from 'zod';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAddBlogs } from '@/hooks/useBlogs';
import { useAuthStore } from '@/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BlogsTabParamList } from '@/navigation/types';
import { useState } from 'react';
import { ButtonComponent } from '@/components/atoms/button';
import { TextComponent } from '@/components/atoms/text';
import { uploadBlogCover } from '@/services/blogCoverService';

export const blogSchema = z.object({
  title: z.string().trim().min(1, 'Title is Required'),
  body: z.string().min(1, 'Post is Required'),
});

export type blogsFormValues = z.infer<typeof blogSchema>;

export type AddBlogNav = BottomTabNavigationProp<BlogsTabParamList, 'AddBlog'>;
export const AddBlogsScreen = () => {
  const navigation = useNavigation<AddBlogNav>();
  const user = useAuthStore(s => s.user);
  const { mutate: addBlog, isPending } = useAddBlogs();
  const [localCoverUri, seLocalCoverUri] = useState<string | null>(null);
  const [coverBase64, setCoverBase64] = useState<string | null>(null);
  const [coverMime, setCoverMime] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<blogsFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const pickCover = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
      includeBase64: true,
    });
    const asset = result.assets?.[0];
    if (!asset?.uri) return;
    seLocalCoverUri(asset.uri);
    setCoverBase64(asset.base64 ?? null); // new state
    setCoverMime(asset.type ?? 'image/jpeg');
  };

  const busy = isPending || isUploading;

  const onSubmit = async (data: blogsFormValues) => {
    if (!user?.id) {
      Alert.alert('Not Signed in', 'Please Log In Again');
      return;
    }
    try {
      let coverUrl: string | undefined;
      if (coverBase64) {
        setIsUploading(true);
        coverUrl = await uploadBlogCover(coverBase64, user.id, coverMime);
      }

      addBlog(
        {
          title: data.title,
          body: data.body,
          coverUrl: coverUrl,
        },
        {
          onSuccess: () => {
            reset();
            seLocalCoverUri(null);
            navigation.navigate('Home');
          },
          onError: err => {
            Alert.alert(
              'Could Not Publish',
              err instanceof Error ? err.message : 'Something Went Wrong',
            );
          },
        },
      );
    } catch (err) {
      Alert.alert(
        'Cover upload failed',
        err instanceof Error ? err.message : 'Try another image',
      );
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <ScreenWrapper
      padded
      edges={['bottom']}
      backgroundColor={colors.secondary[50]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputComponent
              label="Title"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Add Title"
              error={errors.title?.message}
              required
            />
          )}
        />
        <Controller
          control={control}
          name="body"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextArea
              label="Content"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Add Content"
              error={errors.body?.message}
              required
              rows={6}
            />
          )}
        />
        <View style={styles.coverBlock}>
          <TextComponent variant="labelMedium" color={colors.neutral.gray[700]}>
            Cover Image (Optional)
          </TextComponent>

          {localCoverUri ? (
            <Image source={{ uri: localCoverUri }} style={styles.preview} />
          ) : (
            <View style={styles.previewPlaceholder}>
              <TextComponent variant="caption" color={colors.neutral.gray[500]}>
                No Image Selected
              </TextComponent>
            </View>
          )}

          <View style={styles.coverActions}>
            <ButtonComponent
              title={localCoverUri ? 'Change Cover' : 'Add Cover'}
              onPress={pickCover}
              variant="outline"
              size="md"
              disabled={busy}
            />

            {localCoverUri && (
              <ButtonComponent
                title="Remove"
                variant="outline"
                size="md"
                onPress={() => seLocalCoverUri(null)}
                disabled={busy}
              />
            )}
          </View>
        </View>

        <ButtonComponent
          variant="secondary"
          title={isUploading ? 'Uploading Cover...' : 'Publish'}
          size="md"
          onPress={handleSubmit(onSubmit)}
          disabled={busy}
          loadingState={busy}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverBlock: {
    gap: spacing.sm,
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.md,
  },
  previewPlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.white,
  },
  content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  coverActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
