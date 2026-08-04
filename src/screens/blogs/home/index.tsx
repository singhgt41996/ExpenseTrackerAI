import { ButtonComponent } from '@/components/atoms/button';
import { TextComponent } from '@/components/atoms/text';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { useGetBlogs } from '@/hooks/useBlogs';
import { BlogsStackParamList, BlogsTabParamList } from '@/navigation/types';
import { Blogs } from '@/services/blogsService';
import { borderRadius, colors, spacing } from '@/theme';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

export type BlogsHomeScreenNav = CompositeNavigationProp<
  BottomTabNavigationProp<BlogsTabParamList, 'Home'>,
  NativeStackNavigationProp<BlogsStackParamList>
>;

export const BlogsHomeScreen = () => {
  const navigation = useNavigation<BlogsHomeScreenNav>();
  const {
    data: blogs = [],
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useGetBlogs();

  if (isLoading) {
    return (
      <ScreenWrapper padded backgroundColor={colors.secondary[100]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.secondary[600]} />
        </View>
      </ScreenWrapper>
    );
  }
  return (
    <ScreenWrapper padded backgroundColor={colors.secondary[100]}>
      <TextComponent variant="h2" color={colors.neutral.gray[900]}>
        My Blogs
      </TextComponent>

      {isError ? (
        <View style={styles.centered}>
          <TextComponent color={colors.error.main}>
            Couldn't load blogs
          </TextComponent>
          <ButtonComponent
            size="md"
            variant="outline"
            title="Tap To Retry"
            onPress={() => refetch()}
          />
        </View>
      ) : (
        <FlatList
          data={blogs}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={!isLoading && isFetching}
              onRefresh={refetch}
              tintColor={colors.secondary[600]}
              colors={[colors.secondary[600]]}
            />
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <TextComponent color={colors.neutral.gray[500]}>
                No blogs yet. Create one from the Add tab.
              </TextComponent>
            </View>
          }
          renderItem={({ item }) => (
            <BlogCard
              blog={item}
              onPress={() => navigation.navigate('BlogDetail', { id: item.id })}
            />
          )}
        />
      )}
    </ScreenWrapper>
  );
};

export const BlogCard = ({
  blog,
  onPress,
}: {
  blog: Blogs;
  onPress: () => void;
}) => {
  console.log(blog, onPress);
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      {blog.coverUrl ? (
        <Image source={{ uri: blog.coverUrl }} style={styles.cover} />
      ) : null}

      <View style={styles.cardBody}>
        <TextComponent
          variant="h3"
          color={colors.neutral.gray[900]}
          numberOfLines={2}
        >
          {blog.title}
        </TextComponent>
        <TextComponent
          variant="bodySmall"
          color={colors.neutral.gray[600]}
          numberOfLines={2}
        >
          {' '}
          {blog.body}
        </TextComponent>
        <TextComponent variant="caption" color={colors.neutral.gray[500]}>
          {format(blog.createdAt, 'MMM d,yyyy')}
        </TextComponent>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxxl,
  },
  card: {
    overflow: 'hidden',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cover: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: spacing.md,
    gap: spacing.xs,
  },
});
