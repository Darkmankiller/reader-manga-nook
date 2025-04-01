
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ReaderNavigationProps {
  currentId: string;
  prevId?: string;
  nextId?: string;
}

const ReaderNavigation = ({ currentId, prevId, nextId }: ReaderNavigationProps) => {
  return (
    <div className="reader-nav">
      <Button
        variant="outline"
        disabled={!prevId}
        onClick={() => prevId ? null : alert("Previous chapter not available yet!")}
      >
        {prevId ? (
          <Link to={`/reader/${prevId}`} className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Link>
        ) : (
          <>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </>
        )}
      </Button>
      
      <Link to="/">
        <Button variant="outline">Back to Home</Button>
      </Link>
      
      <Button
        variant="outline"
        disabled={!nextId}
        onClick={() => nextId ? null : alert("Next chapter not available yet!")}
      >
        {nextId ? (
          <Link to={`/reader/${nextId}`} className="flex items-center">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ReaderNavigation;
