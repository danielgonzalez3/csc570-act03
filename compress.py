import pandas as pd

# Read in the first CSV file
df1 = pd.read_csv('log.csv')

# Read in the second CSV file
df2 = pd.read_csv('webgazer_data.csv')


df1['timestamp'] = df1['timestamp'].str[:-8]
df2['timestamp'] = df2['timestamp'].str[:-5]

# Merge the dataframes
merged_df = pd.concat([df1, df2])

# Sort by the timestamp column
merged_df = merged_df.sort_values(by=['timestamp'])

# Write the merged dataframe to a new CSV file
merged_df.to_csv('merged.csv', index=False)
