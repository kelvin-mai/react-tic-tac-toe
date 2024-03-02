import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

export const Leaderboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>This is a list of the top 5 players.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Do you have what it takes to make it to the top of the leaderboard?
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Rank</TableHead>
              <TableHead className='text-center'>User</TableHead>
              <TableHead className='text-center'>Games Won</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='text-center'>1</TableCell>
              <TableCell className='text-center'>Player 1</TableCell>
              <TableCell className='text-center'>22</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
