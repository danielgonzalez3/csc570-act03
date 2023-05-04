import pandas as pd

# Read in the first CSV file
df1 = pd.read_csv('log.csv')

# Read in the second CSV file
df2 = pd.read_csv('webgazer_data.csv')

# Convert the timestamps to datetime objects
df1['timestamp'] = pd.to_datetime(df1['Timestamp'])
df2['timestamp'] = pd.to_datetime(df2['timestamp'])

# Merge the two dataframes based on the timestamp
merged_df = pd.merge_asof(df1, df2, left_on='timestamp', right_on='timestamp', direction='nearest')

# Drop the original 'Timestamp' column from df2
merged_df.drop(columns='Timestamp', inplace=True)

# Write the merged dataframe to a new CSV file
merged_df.to_csv('merged_file.csv', index=False)
