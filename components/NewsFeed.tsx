import React from 'react';
import { ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Article from '@/components/Article';

interface NewsProps {
  articles: [];
} 

const NewsFeed = ({ articles }: NewsProps) => {
  const router = useRouter();
  const filteredArticles = articles.filter(article => article.title!=='[Removed]')

  return (
    <ScrollView style={styles.scrollView}>
      {filteredArticles.slice(0, 20).map((article, index) => (
        <Pressable
          key={index}
          onPress={() => {
            router.push({
              pathname: `/pages/${index}`,
              params: { article: JSON.stringify(article) },
            });
          }}
        >
          <Article
          GivenArticle = {JSON.stringify(article)}
          id={null}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default NewsFeed;